package com.team6.controller;

import com.team6.entity.Address;
import com.team6.service.address.AddressService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AddressController {
    @Autowired
    private AddressService addressService;
    @ResponseBody
    @RequestMapping(value="/address/useraddress")
    public Object getUserAddress(HttpServletRequest request){
        return addressService.queryAddressByUserId(request);
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
