import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './Service/User.service';
import { CommonModule, JsonPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserResponse } from './Model/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, CommonModule, DatePipe, FormsModule],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'rest-api-poc';
  data: UserResponse[] = [];
  userList: UserResponse[] = [];
  UserDetails = ['First Name', 'Age', 'Email', 'Phone Number', 'Birth Date'];
  searchFields = [
    { name: 'firstName', placeholder: 'Search by First Name' },
    { name: 'age', placeholder: 'Search by Age' },
    { name: 'email', placeholder: 'Search by Email' },
    { name: 'phone', placeholder: 'Search by Phone' },
    { name: 'birthDate', placeholder: 'Search by Birth Date' }
  ];
  

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userHandeller()
  }

  userHandeller() {
    this.userService.userData().subscribe((res) => {
      this.data = res.users;
      this.userList = this.data
      console.log(this.data)
    }, error => console.log(error.status))
  }



  searchData(value: string) {
    const searchValue = value.toLocaleLowerCase().trim();

    this.userList = this.data.filter(users => {
      const NameMatch = users.firstName.toLocaleLowerCase().includes(searchValue);
      const AgeMatch = users.age.toString().includes(searchValue);
      const phoneMatch = users.phone.toLocaleLowerCase().includes(searchValue);
      const emailMatch = users.email.toLocaleLowerCase().includes(searchValue);
      const birthdateMatch = users.birthDate.toLocaleLowerCase().includes(searchValue);

      return NameMatch || AgeMatch || phoneMatch || emailMatch || birthdateMatch;
    });
  }


  searchDataType(type: string, value: any) {
    this.userList = type === 'age' && isNaN(parseInt(value)) ?
      this.data.filter(item => item.age === parseInt(value))
      : this.data.filter(item =>
          item.firstName.toLocaleLowerCase().includes(value) ||
          item.age.toString().includes(value) ||
          item.email.toLocaleLowerCase().includes(value) ||
          item.phone.toLocaleLowerCase().includes(value) ||
          item.birthDate.toLocaleLowerCase().includes(value));
  }

  handleDelete() {
    this.userList = this.data
  }
}
