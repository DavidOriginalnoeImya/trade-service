package ru.home.util;

import org.apache.poi.xwpf.usermodel.*;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class DocumentCreator {

    @ConfigProperty(name = "document.available.certificate.name", defaultValue = "available-certificate.docx")
    String availableCertificateName;

    private final static Map<String, String> monthNamesByNumber;

    static {
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

    public void writeCertificate(List<String> products) {
        try (XWPFDocument document = new XWPFDocument()) {
            addFormerParagraph(document, "Иванов Д.А.");
            addFormDateParagraph(document);
            document.createParagraph();
            addTitleParagraph(document, "Справка №3");
            addTitleParagraph(document, "о наличии товара во всех магазинах сети");
            document.createParagraph();
            addTable(document, products);

            document.write(new FileOutputStream(availableCertificateName));
        }
        catch (IOException e) {
            e.printStackTrace();
        }
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

    private void addTable(XWPFDocument document, List<String> content) {
        XWPFTable table = document.createTable(content.size() + 1, 4);
        table.setTableAlignment(TableRowAlign.CENTER);

        fillTableHeader(table.getRow(0), List.of("№", "Наименование товара", "Код товара", "Количество, шт"));

        for (int index = 0; index < content.size(); ++index) {
            XWPFTableRow row = table.getRow(index + 1);

            List<XWPFTableCell> cellsList = row.getTableCells();
            customizeTableCell(cellsList.get(0), String.valueOf(index + 1), "700");
            customizeTableCell(cellsList.get(1), content.get(index), "2000");
            customizeTableCell(cellsList.get(2), "25", "2000");
            customizeTableCell(cellsList.get(3), "35", "2000");
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
}
