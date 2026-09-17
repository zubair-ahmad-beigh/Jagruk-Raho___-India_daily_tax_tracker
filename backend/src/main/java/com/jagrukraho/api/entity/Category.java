package com.jagrukraho.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "hsn_code", length = 20)
    private String hsnCode;

    @Column(name = "sac_code", length = 20)
    private String sacCode;

    @Column(name = "requires_state", nullable = false)
    private Boolean requiresState = false;

    @Column(name = "icon_name", length = 50)
    private String iconName = "ShoppingBag";

    @Column(nullable = false)
    private Boolean active = true;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
