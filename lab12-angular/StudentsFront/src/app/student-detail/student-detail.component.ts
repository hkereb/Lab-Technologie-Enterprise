import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
  student = signal<Student | null>(null);

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getStudent();
  }

  getStudent(): void {
    const pathId = this.route.snapshot.paramMap.get('id');
    if (pathId) {
      this.studentService.getStudent(+pathId)
        .subscribe(student => this.student.set(student));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const s = this.student();
    if (s) {
      this.studentService.updateStudent(s)
        .subscribe(() => this.goBack());
    }
  }
}