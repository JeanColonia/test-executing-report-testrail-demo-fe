import { Component, ElementRef, ViewChild } from '@angular/core';
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

 loading = false;
  message = '';
  downloadUrl: string | null = null;
  @ViewChild('urlInput') urlInput!: ElementRef;

  constructor(private pdfService: FormService) {}

  generate(url: string) {
    this.loading = true;
    this.message = 'Procesando...';
    this.downloadUrl = null;

    this.pdfService.generatePdf(url).subscribe({
      next: jobId => {
        this.message = 'Generando PDF, espera un momento...';
        this.pdfService.waitUntilReady(jobId).subscribe({
          next: ready => {
            if (ready) {
              this.message = '¡PDF listo! Haciendo descarga...';
              this.pdfService.downloadPdf(jobId).subscribe(blob => {
                const fileURL = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = fileURL;
                a.download = 'Reporte_de_pruebas.pdf';
                a.click();
                URL.revokeObjectURL(fileURL);
                 this.urlInput.nativeElement.value = '';
                this.message = 'Descarga completada.';
                this.loading = false;
              });
            }
          },
          error: err => {
            this.message = 'Error al generar PDF';
            this.loading = false;
          }
        });
      },
      error: err => {
        this.message = 'Error al enviar petición';
        this.loading = false;
      }
    });
  }
  
}
