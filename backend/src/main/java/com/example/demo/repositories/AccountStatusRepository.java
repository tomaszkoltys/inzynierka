package com.example.demo.repositories;
import com.example.demo.entities.AccountStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountStatusRepository extends CrudRepository<AccountStatus, Integer> {
}
