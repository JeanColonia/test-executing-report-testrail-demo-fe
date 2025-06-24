import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from '../services/form-service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-url-form',
  imports: [FormsModule,NgIf],
  standalone: true,
  templateUrl: './url-form.html',
  styleUrl: './url-form.css'
})
export class UrlForm {


  url:string ='';
  loading: boolean = false;
  errorMessage: string='';

  constructor(private formService: FormService){}

  generateReport(){
    const trimmedUrl = this.url.trim();
    if(!trimmedUrl) return;
    this.loading = true;
    this.errorMessage= '';


    this.formService.generateReport(trimmedUrl).subscribe(blob => {
      this.url = '';
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'Reporte_de_pruebas.pdf'
      link.click();
      URL.revokeObjectURL(fileURL);
      this.loading = false;
    },
    error => {
      console.error('Error al generar el reporte PDF', error);
      this.url = '';
      this.errorMessage = 'Error al generar el reporte, revisa si la URL tiene una estructura similiar a la siguiente: \n https://alicorpdigital.testrail.io/index.php?/runs/view/1864&group_by=cases:section_id&group_order=asc&group_id=11585';
      this.loading = false;
    }
  )
  }
  
}
