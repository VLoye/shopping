package com.team6.controller;

import com.team6.entity.Address;
import com.team6.service.address.AddressService;
import org.apache.ibatis.annotations.Param;
import org.noggit.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class AddressController {
    @Autowired
    private AddressService addressService;

    @ResponseBody
    @RequestMapping(value="/address/useraddress",produces = "text/json;charset=UTF-8")
    public Object getUserAddress(Model model,HttpServletRequest request){
        List list= (List) addressService.queryAddressByUserId(request);
        model.addAttribute("address",list);
        return JSONUtil.toJSON(model);
    }

    @ResponseBody
    @RequestMapping(value="/address/saveorupdateaddress")
    public Object saveOrupdate(Address address, HttpServletRequest request){
        return addressService.saveOrupdateAddress(address,request);
    }

    @ResponseBody
    @RequestMapping("/address/deladdress")
    public Object delAddress(@Param("id")int id,HttpServletRequest request){
        return  addressService.delAddressById(id,request);
    }
}
