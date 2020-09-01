const { Builder, By, Key, until, Capabilities} = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
require('geckodriver').path;


(async function example() {
  const screen = {
    width: 640,
    height: 480
  };
  
  
  let caps = Capabilities.firefox();
  caps.set('silent', true);

  const options = new firefox.Options()
  options.headless();
  options.windowSize(screen);

  let driver = await new Builder()
                        .forBrowser("firefox")
                        .withCapabilities(caps)
                        .setFirefoxOptions(options)
                        .build();
  try {
    await driver.get("http://www.google.com/ncr");
    await driver
      .findElement(By.name("q"))
      .sendKeys("https://rentcars.com.br", Key.RETURN);


    let elementoQuantidadeAnuncios = await driver.wait(
      until.elementLocated(By.css("body.vasq #result-stats")),
      10000
    );

    var qtdAnuncios = await elementoQuantidadeAnuncios.getAttribute("textContent");
    console.log(qtdAnuncios);
  } finally {
    await driver.quit();
  }
})();
