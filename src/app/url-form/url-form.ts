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

  // Limpia el input desde el inicio
  this.urlInput.nativeElement.value = '';

  this.pdfService.generatePdf(url).subscribe({
    next: jobId => {
      this.message = 'Generando PDF. Espera un momento...';
      
      // Solo una vez, hacer polling hasta que esté listo
      this.pdfService.waitUntilReady(jobId).subscribe({
        next: ready => {
          if (ready) {
            this.message = '¡PDF listo! Descargando...';
            this.download(jobId);
          }
        },
        error: () => this.handleError('Error al consultar el estado del PDF.')
      });
    },
    error: () => this.handleError('Error al enviar la solicitud. Intenta nuevamente.')
  });
}

  private download(jobId: string) {
    this.pdfService.downloadPdf(jobId).subscribe({
      next: blob => {
        const fileURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'Reporte_de_pruebas.pdf';
        a.click();
        URL.revokeObjectURL(fileURL);
        this.message = 'Descarga completada.';
        this.loading = false;
      },
      error: () => this.handleError('Error al descargar el archivo.')
    });
  }

  private handleError(msg: string) {
    this.message = msg;
    this.loading = false;
  }
}
