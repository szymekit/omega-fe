import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {saveConfiguration} from '../../state/actions/configuration.actions';
import {Router} from '@angular/router';
import {Configuration, EngineType} from '../../models/configuration.model';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    MatError,
    MatLabel,
    NgIf,
    NgForOf,
    /* Angular Material Modules */]
})
export class ConfigurationFormComponent implements OnInit {
  configurationForm: FormGroup;
  engineTypes: EngineType[] = ['Internal Combustion', 'Electric', 'Battery'];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.configurationForm = this.fb.group({
      engineType: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      internalCombustionConfig: this.fb.group({
        engineCapacity: [null],
        fuelTankCapacity: [null],
        cuttingHeightLevels: [null],
      }),
      electricConfig: this.fb.group({
        cableLength: [null],
        bladeCount: [null],
        color: [''],
      }),
      batteryConfig: this.fb.group({
        batteryCount: [null],
        batteryCapacity: [null],
        color: [''],
      }),
    });
  }

  get engineType(): EngineType | undefined {
    return this.configurationForm.get('engineType')?.value;
  }

  ngOnInit(): void {
    this.configurationForm.get('engineType')?.valueChanges.subscribe(engineType => {
      this.updateValidators(engineType);
    });

    this.updateValidators(this.configurationForm.get('engineType')?.value);
  }

  updateValidators(engineType: string): void {
    this.clearValidators();

    if (engineType === 'Internal Combustion') {
      this.configurationForm.get('internalCombustionConfig.engineCapacity')?.setValidators([Validators.required, Validators.max(200)]);
      this.configurationForm.get('internalCombustionConfig.fuelTankCapacity')?.setValidators([Validators.required, Validators.max(1)]);
      this.configurationForm.get('internalCombustionConfig.cuttingHeightLevels')?.setValidators([Validators.required]);
    } else if (engineType === 'Electric') {
      this.configurationForm.get('electricConfig.cableLength')?.setValidators([Validators.required, Validators.min(10), Validators.max(30)]);
      this.configurationForm.get('electricConfig.bladeCount')?.setValidators([Validators.required]);
      this.configurationForm.get('electricConfig.color')?.setValidators([Validators.required]);
    } else if (engineType === 'Battery') {
      this.configurationForm.get('batteryConfig.batteryCount')?.setValidators([Validators.required]);
      this.configurationForm.get('batteryConfig.batteryCapacity')?.setValidators([Validators.required]);
      this.configurationForm.get('batteryConfig.color')?.setValidators([Validators.required]);
    }

    this.configurationForm.get('internalCombustionConfig.engineCapacity')?.updateValueAndValidity();
    this.configurationForm.get('internalCombustionConfig.fuelTankCapacity')?.updateValueAndValidity();
    this.configurationForm.get('internalCombustionConfig.cuttingHeightLevels')?.updateValueAndValidity();
    this.configurationForm.get('electricConfig.cableLength')?.updateValueAndValidity();
    this.configurationForm.get('electricConfig.bladeCount')?.updateValueAndValidity();
    this.configurationForm.get('electricConfig.color')?.updateValueAndValidity();
    this.configurationForm.get('batteryConfig.batteryCount')?.updateValueAndValidity();
    this.configurationForm.get('batteryConfig.batteryCapacity')?.updateValueAndValidity();
    this.configurationForm.get('batteryConfig.color')?.updateValueAndValidity();
  }

  clearValidators(): void {
    this.configurationForm.get('internalCombustionConfig.engineCapacity')?.clearValidators();
    this.configurationForm.get('internalCombustionConfig.fuelTankCapacity')?.clearValidators();
    this.configurationForm.get('internalCombustionConfig.cuttingHeightLevels')?.clearValidators();
    this.configurationForm.get('electricConfig.cableLength')?.clearValidators();
    this.configurationForm.get('electricConfig.bladeCount')?.clearValidators();
    this.configurationForm.get('electricConfig.color')?.clearValidators();
    this.configurationForm.get('batteryConfig.batteryCount')?.clearValidators();
    this.configurationForm.get('batteryConfig.batteryCapacity')?.clearValidators();
    this.configurationForm.get('batteryConfig.color')?.clearValidators();
  }

  onSubmit(): void {
    if (this.configurationForm.valid) {
      const configuration: Configuration = this.configurationForm.value;
      this.store.dispatch(saveConfiguration({ configuration }));
      this.router.navigate(['/order']);
    }
  }
}
