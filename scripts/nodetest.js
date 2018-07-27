'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
    fs.stat(filepath, function (err_1, stats) {
        if (!err_1 && stats.isFile()) {
            console.log('200 ' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);         
        }    
        else if (!err_1 && stats.isDirectory())
        {           
            var filepathDefault = path.join(filepath , 'index.html');
            fs.stat(filepathDefault, function (err, stats){                            
                if(!err && stats.isFile()){                                      
                    var filepathDefault = path.join(filepath , 'index.html');//否则不知道为什么filepathDefault变为undefined
                    console.log('200 ' + request.url);
                    response.writeHead(200);
                    fs.createReadStream(filepathDefault).pipe(response);
                    }                               
                else
                {
                    var filepathDefault =path.join(filepath + 'default.html');
                    fs.stat(filepathDefault, function (err, stats){
                        if(!err && stats.isFile())
                        {
                            //var filepathDefault =path.join(filepath + 'default.html');//这里倒不需要重新赋值
                            console.log('200 ' + request.url);
                            response.writeHead(200);
                            fs.createReadStream(filepathDefault).pipe(response);
                        }
                    })
                } 
            })
        } 
        else 
        {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');