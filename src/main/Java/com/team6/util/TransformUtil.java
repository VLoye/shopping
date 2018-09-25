package com.team6.util;

import org.apache.commons.beanutils.PropertyUtilsBean;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class TransformUtil {
    public static Map<String,Object> beanToMap(Object object){
         Map<String ,Object> params= new HashMap<>();
        PropertyUtilsBean propertyUtilsBean = new PropertyUtilsBean();
        PropertyDescriptor[] descriptors =propertyUtilsBean.getPropertyDescriptors(object);
        for(int i=0;i<descriptors.length;i++){
            String name = descriptors[i].getName();
            System.out.println(name);
            if(!"class".equals(name)){
                try {
                    params.put(name,propertyUtilsBean.getNestedProperty(object,name));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                }
            }
        }
        return params;
    }

}
