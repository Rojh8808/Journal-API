package com.pgs.apiProject.repository;

import com.pgs.apiProject.entity.Journal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JournalRepository extends MongoRepository<Journal, String> {
}
