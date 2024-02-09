const { response }  = require('express');
const puppeteer = require("puppeteer");

const browserP = puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],headless: true
});

const obtenerSunat = async(req , res = response) => {

    let page;
    let body_filtros = req.body;

    try{

        page = await (await browserP).newPage();
        await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp');
        await page.waitForSelector("#btnAceptar");  
        await page.type("#txtRuc",body_filtros.documento);
        await page.click("#btnAceptar");
        await page.waitForTimeout(4000);

        try{

            let salida = await page.evaluate(() => {
                var elemento = document.querySelectorAll('.list-group-item-heading');
                const lista = [];
                for (i = 0; i < elemento.length; i++) {
                    // lista.push(elemento[Number(i)].innerHTML);
                    lista.push(elemento[Number(i)].innerText);
                }
    
                return {
                    razon_social    : lista[1],
                    actividades     : lista[11],
                };
                
                // return {
                // razon_social    : elemento[1].innerHTML,
                // actividades     : elemento[11].innerHTML,
                // };
            });
            
            res.status(200).json(
                salida
            );

        } catch (error){
            res.status(400).json({error});
        }
        
    } catch(error) {
        res.status(500).json({
            msg: "No cargo adecuadamente."
        });
    } finally {
        await page.close();
        // console.log("Finaliza asi culmine o no.");
    }

}

module.exports = {
    obtenerSunat
}
