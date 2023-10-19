package com.example.demo.repositories;
import com.example.demo.entities.HelpType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpTypeRepository extends CrudRepository< HelpType, Integer> {
}
