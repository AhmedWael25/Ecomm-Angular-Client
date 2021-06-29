import { Injectable } from "@angular/core";

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


class obj {
    public datax:string;
    public datay:number
}
@Injectable({
    providedIn: 'root'
  })
export class ExportExcelService {

    public exportAsExcel(map: Map<string,number>, name: string) {

        // let  datax:Array<any> = [];
        // let datay:Array<any> = []

        //  map.forEach((value: number, key: string) => {
        //     let temp:obj = new obj();
        //     // temp.datax = key;
        //     // temp.datay = value;
        //     datax.push(key);
        //     datay.push(value);
        //     // data.push(temp);
        // });


        // const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([datax, datay]);
        // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // this.saveAsExcel(excelBuffer, name);



        var wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "Report",
            Subject: "Report",
            Author: "EComm",
            CreatedDate: new Date(),
        }
        wb.SheetNames.push("Report Sheet");

        var ws_data = []

         map.forEach((value: number, key: string) => {
            let temp  = [ key, value ];
            ws_data.push(temp);
        });

        var ws = XLSX.utils.aoa_to_sheet(ws_data);

        wb.Sheets["Report Sheet"] = ws;

        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

        this.saveAsExcel(this.s2ab(wbout), name);
    }


    private saveAsExcel(buffer: any, name: string) {
        const data: Blob = new Blob([buffer], {
            type:"application/octet-stream",
        });
        FileSaver.saveAs(data , name + EXCEL_EXTENSION)
    }

    
    private s2ab(s) { 
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;    
    }



}