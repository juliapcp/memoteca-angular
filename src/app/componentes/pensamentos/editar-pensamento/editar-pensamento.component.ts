import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  id!: number;
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.service.buscarPorId(this.id).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required, ,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo]
      })
    })
  }

  editarPensamento() {
    this.service.editar(this.formulario.value, this.id).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })

  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao() {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado'
    }
  }
}
