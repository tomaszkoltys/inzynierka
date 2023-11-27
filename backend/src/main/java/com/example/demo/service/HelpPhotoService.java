package com.example.demo.service;

import com.example.demo.dto.HelpWithPhotoDTO;
import com.example.demo.entities.Help;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;

@Service
public class HelpPhotoService {

    public void uploadObject(String projectId, String bucketName, String objectName, byte[] object) throws IOException {
        Credentials credentials = GoogleCredentials
                .fromStream(new FileInputStream("src/main/resources/application_default_credentials.json"));

        Storage storage = StorageOptions.newBuilder().setCredentials(credentials)
                .setProjectId(projectId)
                .build().getService();

        BlobId blobId = BlobId.of(bucketName, objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType("image/jpeg")
                .build();

        Storage.BlobWriteOption precondition;
        if (storage.get(bucketName, objectName) == null) {
            precondition = Storage.BlobWriteOption.doesNotExist();
        } else {
            precondition =
                    Storage.BlobWriteOption.generationMatch(
                            storage.get(bucketName, objectName).getGeneration());
        }
        storage.createFrom(blobInfo, new ByteArrayInputStream(object), precondition);
    }

    public byte[] getObject(String projectId, String bucketName, String objectName) throws IOException {
        Credentials credentials = GoogleCredentials
                .fromStream(new FileInputStream("src/main/resources/application_default_credentials.json"));

        Storage storage = StorageOptions.newBuilder().setCredentials(credentials)
                .setProjectId(projectId)
                .build().getService();

        BlobId blobId = BlobId.of(bucketName, objectName);

        return storage.get(blobId).getContent();
    }

    public HelpWithPhotoDTO getHelpWithPhoto(Help help) throws IOException {
        return new HelpWithPhotoDTO(help, getObject("inzynierka", "help-photos", help.getPhoto()));
    }
}
