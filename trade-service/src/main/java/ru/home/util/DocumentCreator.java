package ru.home.util;

import org.apache.poi.xwpf.usermodel.*;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import ru.home.model.CheckProduct;
import ru.home.model.Product;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.POST;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.*;

@ApplicationScoped
public class DocumentCreator {

    @ConfigProperty(name = "document.available.certificate.name", defaultValue = "available-certificate.docx")
    String availableCertificateName;

    @ConfigProperty(name = "document.product.check.name", defaultValue = "product-check.docx")
    String productCheckName;

    private Map<String, String> monthNamesByNumber;

    @PostConstruct
    void monthInit() {
        monthNamesByNumber = new HashMap<>();
        monthNamesByNumber.put("1",  "   января     ");
        monthNamesByNumber.put("2",  "   февраля    ");
        monthNamesByNumber.put("3",  "    марта     ");
        monthNamesByNumber.put("4",  "    апреля    ");
        monthNamesByNumber.put("5",  "      мая     ");
        monthNamesByNumber.put("6",  "     июня     ");
        monthNamesByNumber.put("7",  "     июля     ");
        monthNamesByNumber.put("8",  "   августа    ");
        monthNamesByNumber.put("9",  "   сентября   ");
        monthNamesByNumber.put("10", "    октября   ");
        monthNamesByNumber.put("11", "    ноября    ");
        monthNamesByNumber.put("12", "   декабря    ");
    }

    public byte[] writeInvoice(List<Product> products) {
        try (XWPFDocument document = new XWPFDocument()) {
            addFormerParagraph(document, "Иванов Д.А.");
            addFormDateParagraph(document);
            document.createParagraph();
            addTitleParagraph(document, "Товарная накладная");
            addTitleParagraph(document, "на поставку товара в магазин");
            document.createParagraph();
            addTable(
                    document,
                    List.of("№", "Наименование товара", "Город производства", "Цена, руб", "Количество, шт"),
                    convertProductsToInvoiceTable(products)
            );

            document.write(new FileOutputStream(productCheckName));

            return Files.readAllBytes(java.nio.file.Path.of(productCheckName));
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        return "Check creation error".getBytes(StandardCharsets.UTF_8);
    }

    public byte[] writeCheck(List<CheckProduct> products) {
        try (XWPFDocument document = new XWPFDocument()) {
            addFormerParagraph(document, "Иванов Д.А.");
            addFormDateParagraph(document);
            document.createParagraph();
            addTitleParagraph(document, "Товарный чек №3");
            document.createParagraph();
            addTable(
                    document,
                    List.of("№", "Наименование товара", "Код товара", "Количество, шт", "Цена, руб", "Сумма, руб"),
                    convertProductsToCertTable(products)
            );

            document.write(new FileOutputStream(productCheckName));

            return Files.readAllBytes(java.nio.file.Path.of(productCheckName));
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        return "Check creation error".getBytes(StandardCharsets.UTF_8);
    }

    public byte[] writeCertificate(List<Product> products, String certificateTitle, String formerName) {
        try (XWPFDocument document = new XWPFDocument()) {
            addFormerParagraph(document, formerName);
            addFormDateParagraph(document);
            document.createParagraph();
            addTitleParagraph(document, "Справка");
            addTitleParagraph(document, certificateTitle);
            document.createParagraph();
            addTable(
                    document,
                    List.of("№", "Наименование товара", "Код товара", "Количество, шт"),
                    convertProductsToAvailableCert(products)
            );

            document.write(new FileOutputStream(availableCertificateName));

            return Files.readAllBytes(java.nio.file.Path.of(availableCertificateName));
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        return "Certificate creation error".getBytes(StandardCharsets.UTF_8);
    }

    private void addFormerParagraph(XWPFDocument document, String formerName) {
        XWPFParagraph formerParagraph = document.createParagraph();
        formerParagraph.setAlignment(ParagraphAlignment.RIGHT);

        XWPFRun formerRun = formerParagraph.createRun();
        formerRun.setText("Составитель: ");
        customizeParagraphFont(formerRun, "Times New Roman", 14);
        formerRun = formerParagraph.createRun();
        formerRun.setText("   " + formerName);
        formerRun.setUnderline(UnderlinePatterns.SINGLE);
        customizeParagraphFont(formerRun, "Times New Roman", 14);
    }

    private void addFormDateParagraph(XWPFDocument document) {
        XWPFParagraph formDateParagraph = document.createParagraph();
        formDateParagraph.setAlignment(ParagraphAlignment.RIGHT);

        XWPFRun formDateRun = formDateParagraph.createRun();
        formDateRun.setText("\"" + new SimpleDateFormat("d").format(Calendar.getInstance().getTime()) + "\" ");
        customizeParagraphFont(formDateRun, "Times New Roman", 14);
        formDateRun = formDateParagraph.createRun();
        formDateRun.setText("   " +
                monthNamesByNumber.get(new SimpleDateFormat("M").format(Calendar.getInstance().getTime())) + "   ");
        formDateRun.setUnderline(UnderlinePatterns.SINGLE);
        customizeParagraphFont(formDateRun, "Times New Roman", 14);
        formDateRun = formDateParagraph.createRun();
        formDateRun.setText(" " + new SimpleDateFormat("y").format(Calendar.getInstance().getTime()));
        customizeParagraphFont(formDateRun, "Times New Roman", 14);
    }

    private void addTitleParagraph(XWPFDocument document, String title) {
        XWPFParagraph titleParagraph = document.createParagraph();
        titleParagraph.setAlignment(ParagraphAlignment.CENTER);
        titleParagraph.setSpacingBetween(1);

        XWPFRun titleRun = titleParagraph.createRun();
        titleRun.setText(title);
        customizeParagraphFont(titleRun, "Times New Roman", 14);
    }

    private void addTable(XWPFDocument document, List<String> header, List<List<String>> content) {
        XWPFTable table = document.createTable(content.size() + 1, header.size());
        table.setTableAlignment(TableRowAlign.CENTER);

        fillTableHeader(table.getRow(0), header);

        for (int rowIndex = 0; rowIndex < content.size(); ++rowIndex) {
            XWPFTableRow row = table.getRow(rowIndex + 1);

            List<XWPFTableCell> cellsList = row.getTableCells();
            customizeTableCell(cellsList.get(0), String.valueOf(rowIndex + 1), "700");

            for (int colIndex = 0; colIndex < content.get(rowIndex).size(); ++colIndex) {
                customizeTableCell(cellsList.get(colIndex + 1), content.get(rowIndex).get(colIndex), "2000");
            }
        }
    }

    private void fillTableHeader(XWPFTableRow headerRow, List<String> headerContent) {
        List<XWPFTableCell> headerCells = headerRow.getTableCells();

        if (headerCells.size() == headerContent.size()) {
            int curCellIndex = 0;

            for (XWPFTableCell curCell: headerCells) {
                curCell.setText(headerContent.get(curCellIndex++));
                curCell.getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
                curCell.getParagraphs().get(0).setSpacingAfter(0);
                customizeParagraphFont(curCell.getParagraphs().get(0).getRuns().get(0), "Times New Roman", 12);
                curCell.setVerticalAlignment(XWPFTableCell.XWPFVertAlign.CENTER);
            }
        }
    }

    private void customizeParagraphFont(XWPFRun paragraphRun, String fontFamily, int fontSize) {
        paragraphRun.setFontFamily(fontFamily);
        paragraphRun.setFontSize(fontSize);
    }

    private void customizeTableCell(XWPFTableCell cell, String text, String width) {
        cell.setWidth(width);
        cell.setText(text);
        cell.getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
        cell.getParagraphs().get(0).setSpacingAfter(0);
        customizeParagraphFont(cell.getParagraphs().get(0).getRuns().get(0), "Times New Roman", 12);
        cell.setVerticalAlignment(XWPFTableCell.XWPFVertAlign.CENTER);
    }

    private List<List<String>> convertProductsToCertTable(List<CheckProduct> products) {
        List<List<String>> productTable = new ArrayList<>();

        for (CheckProduct product: products) {
            productTable.add(List.of(
                    product.getName(),
                    product.getCode(),
                    product.getQuantity(),
                    product.getPrice(),
                    product.getSum()
            ));
        }

        return productTable;
    }

    private List<List<String>> convertProductsToAvailableCert(List<Product> products) {
        List<List<String>> productTable = new ArrayList<>();

        for (Product product: products) {
            productTable.add(List.of(product.getName(), product.getId(), product.getQuantity()));
        }

        return productTable;
    }

    private List<List<String>> convertProductsToInvoiceTable(List<Product> products) {
        List<List<String>> productTable = new ArrayList<>();

        for (Product product: products) {
            productTable.add(List.of(
                    product.getName(),
                    product.getCity(),
                    String.valueOf(product.getPrice()),
                    product.getQuantity()
            ));
        }

        return productTable;
    }
}
