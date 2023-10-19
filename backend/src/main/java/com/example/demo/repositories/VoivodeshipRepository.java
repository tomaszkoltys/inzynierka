package com.example.demo.repositories;

import com.example.demo.entities.Voivodeship;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoivodeshipRepository extends CrudRepository<Voivodeship, Integer> {
}
