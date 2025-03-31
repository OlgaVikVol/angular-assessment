import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  standalone: true,
  template: `<app-card><p>Projected Content</p></app-card>`,
  imports: [CardComponent],
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render projected content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-card')?.textContent).toContain('Projected Content');
  });
});
