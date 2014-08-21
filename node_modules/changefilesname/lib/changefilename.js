#!/usr/bin/env node

var fs  = require('fs');
var path = require('path');
var url='C:/Users/Administrator/Desktop/整理/新资料/我的图片资源/book/xu.txt';

function changefilename(err,fileUrl,index){
    var fileUrlArr =  fileUrl.split("\\");
    var dir = fileUrlArr.slice(0,-1).join("\\");
    var newFileName = fileUrl.split("\\")[fileUrlArr.length-1].replace(/(.*)\.jpg/,index+".jpg");
    var newPath = path.join(dir,newFileName);
    console.log(newPath);
    fs.rename(fileUrl,newPath,function(err){

    });
}


function main (argv,callback){
    var dir = argv[2];
    fs.stat(dir,function(err,stat){
        if(err){
            callback(err);
        }else if(!stat.isDirectory()){
            callback(new Error("参数不是一个目录！"));
        }else{
            fs.readdir(dir,function(err,files){
                files.forEach(function(file,index){
                    callback(null,path.join(dir,file),index);
                });
            });
        }
    })
}
function changefilesname(){
	main(process.argv,changefilename);
}
exports.changefilesname = changefilesname;
