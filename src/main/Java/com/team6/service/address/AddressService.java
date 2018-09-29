package com.team6.service.address;

import com.team6.entity.Address;

import javax.servlet.http.HttpServletRequest;

public interface AddressService {
    public Object queryAddressByUserId(HttpServletRequest request);
    public Object delAddressById(Integer addressId,HttpServletRequest request);
    public Object saveOrupdateAddress(Address record,HttpServletRequest request);
}
