package com.codecast.codecast_api.dto;

import java.util.List;

public class StudioResponseDTO {
    private Long id;
    private String name;
    private Integer maxCapacity;
    private List<String> equipmentList;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public Integer getMaxCapacity(){
        return maxCapacity;
    }
    public void setMaxCapacity(Integer maxCapacity){
        this.maxCapacity = maxCapacity;
    }
    public List<String> getEquipmentList(){
        return equipmentList;
    }
    public void setEquipmentList(List<String> equipmentList){
        this.equipmentList = equipmentList;
    }
}
