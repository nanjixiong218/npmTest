#!/usr/bin/env node

var fs  = require('fs');
var path = require('path');

function changefilesname(){
    var dirPath = process.argv[2];
    var filePre = process.argv[3] || "xu";

    fs.stat(dirPath,function (err,status) {
            if(status.isDirectory()){
                fs.readdir(dirPath,function(err,files){
                    var times = 0;
                    (function next(i){//先重命名为当前时间戳
                        if(i<files.length){
                            console.log(files.length);
                            console.log(i);
                            var oldName = path.join(dirPath,files[i]);
                            var newName = path.join(dirPath,Date.now()+i+".jpg");
                            fs.rename(oldName,newName,function(err){
                                if(err){
                                    console.log(err);
                                }else{

                                   if(times==files.length-1){
                                       //这里是所有异步接受之后的操作

                                       fs.readdir(dirPath,function(err,files){
                                           var times = 0 ;
                                           (function next(i){
                                               if(i<files.length){
                                                   var oldName = path.join(dirPath,files[i]);
                                                   var newName = path.join(dirPath,filePre+i+".jpg");
                                                   fs.rename(oldName,newName,function(err){
                                                       if(err){
                                                           console.log(err);
                                                       }else{
                                                           if(times==files.length-1){
                                                               console.log("over!");
                                                           }else{
                                                               times++;
                                                           }

                                                       }
                                                   });
                                                   next(++i);
                                               }else{
                                                   console.log("异步2启动完毕!");
                                               }
                                           })(0)
                                       });
                                   }else{
                                       times++;
                                   }

                                }
                            });
                            next(++i);
                        }else{
                            console.log("异步1启动完毕!");
                        }
                    }(0));

                });
            }
        })
}
exports.changefilesname = changefilesname;
