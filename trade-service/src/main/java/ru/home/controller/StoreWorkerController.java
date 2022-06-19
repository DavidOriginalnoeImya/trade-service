package ru.home.controller;

import org.apache.poi.xwpf.usermodel.*;
import ru.home.util.DocumentCreator;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@ApplicationScoped
public class StoreWorkerController {

    @Inject
    DocumentCreator documentCreator;

    public void createAvailableCertificate(List<String> products) {
        documentCreator.writeCertificate(products);
    }
}
