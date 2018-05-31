package cc.homer3000.spider;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.common.util.concurrent.RateLimiter;
import java.io.File;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.http.client.fluent.Request;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author homer3000
 * @date 2018/5/28
 */
public class JiandanSpider {

    private static final Logger LOGGER = LoggerFactory.getLogger(JiandanSpider.class);

    public static void main(String[] args) {
        DecryptService decryptService = new DecryptService();
        decryptService.init();
        JiandanSpider spider = new JiandanSpider(decryptService);
        CrawlResult crawlResult;
        String uri = "http://jandan.net/ooxx";
        Set<String> imageUriSet = Sets.newLinkedHashSet();
        RateLimiter limiter = RateLimiter.create(2);
        int maxPageCount = 10;
        do {
            crawlResult = spider.crawl(uri);
            LOGGER.info("uri=" + uri);
            crawlResult.imageUris
                .stream()
                .filter(e -> !e.contains("gif"))
                .forEach(imageUriSet::add);
            LOGGER.info("imageSize=" + crawlResult.imageUris.size());
            uri = crawlResult.nextPageUri;
            limiter.acquire();
            maxPageCount--;
        } while (maxPageCount > 0 && uri != null);
        decryptService.destroy();
        spider.downloadImage(imageUriSet, "image/");
    }

    private DecryptService decryptService;

    private JiandanSpider(DecryptService decryptService) {
        this.decryptService = decryptService;
    }

    private CrawlResult crawl(String uri) {
        String crawlResult = null;
        try {
            crawlResult = Request.Get(uri)
                .addHeader("Accept-Encoding", "gzip, deflate")
                .addHeader("Host", "jandan.net")
                .addHeader("Referer", "http://jandan.net/ooxx/page-50689450")
                .addHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36")
                .execute()
                .returnContent()
                .asString();
        } catch (Exception e) {
            LOGGER.error("crawl error", e);
        }
        int status = 0;
        if (crawlResult != null && crawlResult.contains("row")) {
            status = 1;
        }
        Document doc = Jsoup.parse(crawlResult);
        return CrawlResult.builder()
            .status(status)
            .crawlResult(crawlResult)
            .imageUris(extractImageUris(doc))
            .uri(uri)
            .nextPageUri(extractNextPageUri(doc))
            .build();
    }

    private List<String> extractImageUris(Document doc) {
        try {
            List<String> imageHash = doc.select(".img-hash").eachText();
            String[] args = new String[imageHash.size()];
            String result = decryptService.decrypt(imageHash.toArray(args));
            return JSON.parseArray(result).toJavaList(String.class);
        } catch (Exception e) {
            LOGGER.error("extractImageUris error", e);
            return Lists.newArrayList();
        }
    }

    private String extractNextPageUri(Document doc) {
        try {
            return "http:" + doc.select(".previous-comment-page").first().attr("href");
        } catch (Exception e) {
            LOGGER.error("extractNextPageUri error", e);
            return null;
        }
    }

    private void downloadImage(Set<String> imageUriSet, String imagePath) {
        if (imageUriSet == null || imageUriSet.size() == 0) {
            LOGGER.warn("imageUriSet empty");
            return;
        }
        RateLimiter limiter = RateLimiter.create(10);
        imageUriSet.stream().distinct()
            .forEach(e -> {
                LOGGER.info("uri=" + e);
                try {
                    int idx = e.lastIndexOf("/");
                    String fileName = imagePath + e.substring(idx + 1, e.length());
                    LOGGER.info("fileName=" + fileName);
                    File imageFile = new File(fileName);
                    if (imageFile.exists()) {
                        LOGGER.info("图片已下载");
                        return;
                    }
                    limiter.acquire();
                    Request.Get(e)
                        .execute()
                        .saveContent(imageFile);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            });

    }

    @Builder
    @Setter
    @Getter
    static class CrawlResult {

        int status;
        String uri;
        String crawlResult;
        List<String> imageUris;
        String nextPageUri;
    }
}
