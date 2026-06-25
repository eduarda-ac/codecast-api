package com.codecast.codecast_api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "studios")

public class Studio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "max_capacity", nullable = false)
    private Integer maxCapacity;

    @ElementCollection
    @CollectionTable(name = "studio_equipament", joinColumns = @JoinColumn(name = "studio_id"))
    @Column(name = "equipment_name")
    private List<String> equipmentList;

    public Studio() {}

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
