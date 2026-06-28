package com.codecast.codecast_api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class StudioRequestDTO {
    @NotBlank(message = "O nome do estúdio é obrigatório")
    private String name;

    @NotNull(message = "A capacidade máxima é obrigatória")
    @Min(value = 1, message = "A capacidade deve ser maior que zero")
    private Integer maxCapacity;

    private List<String> equipmentList;

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
