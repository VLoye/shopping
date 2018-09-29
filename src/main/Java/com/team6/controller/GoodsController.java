package com.team6.controller;

import com.team6.entity.Goods;
import com.team6.service.Goods.GoodsService;
import com.team6.util.enums.GoodsEnum;
import org.apache.ibatis.annotations.Param;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Date;
@Controller
@RequestMapping(value = "/goods")
public class GoodsController {
    @Autowired
    private GoodsService goodsService;
    /**
     *
     * 保存商品详细信息和图片信息
     * @param imageFile
     * @param goods
     * @param request
     * @return
     */
    @RequestMapping(value="/add",method = RequestMethod.POST)
    public String insertGoods(@RequestParam MultipartFile imageFile,
                              Goods goods,
                              HttpServletRequest request){
        System.out.println("hello world");
        if(imageFile!=null){
            String imgUrl=saveImageFile(imageFile,request);
            goods.setImgUrl(imgUrl);
        }
        Date date=new Date();
        goods.setUploadTime(date);
        GoodsEnum anEnum=goodsService.insertGoods(goods);
        if(anEnum.equals(GoodsEnum.INSERT_GOODS_SUCCESS)){
            return "InsertSuccess";
        }else{
            return "error";
        }
    }
    /*
    查询商品信息
     */
    @RequestMapping(value="/{id}",method = RequestMethod.GET)
    public String queryById(@PathVariable("id")int id){
        Goods goods=goodsService.queryGoodsById(id);
        if(goods!=null) return "success";
        else return "error";
    }
    @RequestMapping(value="/del")
    public String deleteById(@RequestParam int id,
                              HttpServletRequest request){
        Goods goods=goodsService.queryGoodsById(id);
        //删除商品信息
        GoodsEnum anEnum=goodsService.deleteGoodsById(id);
        //删除图片信息
        delImageFile(request,goods.getImgUrl());
        if(anEnum.equals(GoodsEnum.DELETE_GOODS_SUCCESS))
            return "success";
         else
          return "error";
    }
    /*
    保存图片信息并返回文件保存的路径
     */
    private String saveImageFile(MultipartFile imageFile, HttpServletRequest request) {
        //获取文件上传到服务器的路径
        String uploadUrl=getRealPath(request)+"img/";
        System.out.println("文件路径为："+uploadUrl);
        //获取从客户端传过来的文件名
        String filename=imageFile.getOriginalFilename();
        //判断文件上传的路径是否存在，若不存在，则需要创建它
        File dir=new File(uploadUrl);
        if(!dir.exists()){
            dir.mkdirs();
        }
        //targetFile最终上传的文件，先判断文件是否存在
        File targetFile=new File(uploadUrl+filename);
        if(!targetFile.exists()){
            //如果文件不存在，我们尝试创建它
            try {
                targetFile.createNewFile();
            }catch (IOException e){
                e.printStackTrace();
            }
        }
        //使用MultipartFile的transferTo方法保存文件
        try {
            imageFile.transferTo(targetFile);
        }catch (IllegalStateException e){
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }
        return "img/"+filename;
    }
    /*
     删除图片信息并返回删除结果
     */
    private void delImageFile(HttpServletRequest request,String img_url){
        String imageFileUrl=getRealPath(request)+img_url;
        File target=new File(imageFileUrl);
        if(target.exists()){
            target.delete();
        }
    }
    /*
    获取文件真实路径
     */
    public String getRealPath(HttpServletRequest request){
        String ImageFileUrl=request.getSession().getServletContext()
                .getRealPath("/");
        return ImageFileUrl;
    }
}
