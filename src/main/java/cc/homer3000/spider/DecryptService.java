package cc.homer3000.spider;

import java.io.File;
import java.io.FileInputStream;
import java.util.Arrays;
import org.apache.commons.io.IOUtils;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.phantomjs.PhantomJSDriverService.Builder;
import org.openqa.selenium.remote.DesiredCapabilities;

/**
 * @author homer3000
 * @date 2018/5/28
 */
public class DecryptService {

    private PhantomJSDriver driver;
    private PhantomJSDriverService service;
    private String js;

    public void init() {
        try {
            service = new Builder()
                .usingPhantomJSExecutable(new File("/tmp/phantomjs"))
                .usingAnyFreePort()
                .build();
            service.start();
            DesiredCapabilities caps = DesiredCapabilities.phantomjs();
            //caps.setCapability("phantomjs.page.settings.loadImages", false);
            driver = new PhantomJSDriver(service, caps);
            String file = DecryptService.class.getResource("/jiandan_decrypt.js").getFile();
            js = IOUtils.toString(new FileInputStream(file), "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String decrypt(String... cipherTexts) {
        Object[] args = Arrays.stream(cipherTexts).map(e -> (Object) e).toArray();
        return (String) driver.executePhantomJS(js, args);
    }

    public void destroy() {
        try {
            service.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
