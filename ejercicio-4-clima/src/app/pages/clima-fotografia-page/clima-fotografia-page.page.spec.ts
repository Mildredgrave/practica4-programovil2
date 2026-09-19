import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimaFotografiaPagePage } from './clima-fotografia-page.page';

describe('ClimaFotografiaPagePage', () => {
  let component: ClimaFotografiaPagePage;
  let fixture: ComponentFixture<ClimaFotografiaPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaFotografiaPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
