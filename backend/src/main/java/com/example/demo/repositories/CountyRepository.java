package com.example.demo.repositories;
import com.example.demo.entities.County;
import com.example.demo.entities.Help;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountyRepository extends CrudRepository<County, Integer> {
    @Query(value = "select * from county where voivodeship = :voivodeship ", nativeQuery = true)
    List<County> findByVoivodeship(int voivodeship);
}
