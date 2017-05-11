var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){
    scrape('http://www.123dj.com');
})


function scrape(url){
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var title = "";
            var description = "";
            var price = "";
            var salePrice = "";

            var x = 0;
            var links = [];
            $('body').find('a').each(function(){
                links[x] = $(this).attr('href');
                x++;
            });

            var titleHolder = $('.in_hd').find('span').each(function(){
                title = title + $(this).text();
            });

            var priceHolder = $('.price_ctr3').first();

            price = $(priceHolder).find('p').text();
            salePrice = $(priceHolder).find('span').text();

            description = $('.para').text();
            for(x = 0; x < links.length; x++){
                if(links[x]){
                    scrape(links[x]);
                }
            }
        }
    })
}

app.listen('8081')
console.log('Port 8081');
exports = module.exports = app;
