'use strict';

let library = [];
const body = document.querySelector("body");
const addBookBtn = document.querySelector(".addBook");
const removeAllBtn = document.querySelector(".removeAll");

function Book(author, title, pages, read) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.read = read;
}

Book.prototype.hello = function () {
	console.log(`Hi! I was written by ${this.author}, my title is ${this.title} and I have a total of ${this.pages} pages. It is ${this.read} that you read me yet.`);
};

Book.prototype.edit = function (author, title, pages, read,) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.read = read;
	displayBooks();
};

Book.prototype.remove = function (index) {
	library.splice(index, 1);
	displayBooks();
};

function addBook(author, title, pages, read) {
	let book = new Book(author, title, pages, read);
	library.push(book);
}

function displayBooks() {
	const books = document.querySelectorAll(".card");
	books.forEach((book) => {
		book.remove();
	});
	library.forEach((book) => {
		let card = document.createElement("div");
		card.classList.add("card");
		let i = 0;
		for (const prop in book) {
			if (i < 4) {
				let row = document.createElement("div");
				row.textContent = `${prop}: ${book[prop]}`;
				card.appendChild(row);
				i++;
			}
		}
		let controls = document.createElement("div");
		controls.classList.add("bookControls");
		let editBtn = document.createElement("button");
		editBtn.textContent = "Edit";
		editBtn.addEventListener("click", (event) => {
			createForm(event.target.parentNode.parentNode);
		});
		controls.appendChild(editBtn);

		let removeBtn = document.createElement("button");
		removeBtn.textContent = "Remove";
		removeBtn.addEventListener("click", (event) => {
			const books = Array.from(document.querySelectorAll(".card"));
			const index = books.indexOf(event.target.parentNode.parentNode);
			let book = library[index];
			book.remove(index);
		});
		controls.appendChild(removeBtn);

		card.appendChild(controls);

		const main = document.querySelector("main");
		main.appendChild(card);
	});
}

function createForm(origin) {
	let formCont = document.createElement("div");
	formCont.classList.add("form");
	let formText = document.createElement("p");
	formText.textContent = "Add a book!";
	let form = document.createElement("form");
	let props = ["author", "title", "pages", "read"];

	for (let i = 0; i < props.length; i++) {
		let label = document.createElement("label");
		label.htmlFor = `${props[i]}`;
		label.textContent = `${props[i]}`;
		form.appendChild(label);

		let input = document.createElement("input");
		input.id = props[i];
		input.name = props[i];
		if (props[i] === "pages") {
			input.min = "1";
			input.type = "number";
		}
		else input.type = "text";
		if (props[i] === "author" || props[i] === "title")
			input.pattern = "^[a-zA-Z0-9\s]+$";
		else if (props[i] === "read") input.pattern = "^true|false$";

		form.appendChild(input);
	}

	let submitBtn = document.createElement("button");
	submitBtn["type"] = "submit";
	submitBtn.textContent = "Submit";
	submitBtn.addEventListener("click", (event) => {
		event.preventDefault();
		const author = document.querySelector("#author");
		const title = document.querySelector("#title");
		const pages = document.querySelector("#pages");
		const read = document.querySelector("#read");
		if (author.checkValidity() && title.checkValidity() && pages.checkValidity() && read.checkValidity()) {
			if (origin === "newBook") {
				addBook(author.value, title.value, pages.value, read.value);
				displayBooks();
			}
			else {
				const books = Array.from(document.querySelectorAll(".card"));
				let book = library[books.indexOf(origin)];
				book.edit(author.value, title.value, pages.value, read.value);
			}
			formBackground.remove();
		}
	});
	form.appendChild(submitBtn);

	formCont.appendChild(formText);
	formCont.appendChild(form);

	let formBackground = document.createElement("div");
	formBackground.classList.add("formBackground");
	formBackground.appendChild(form);
	formBackground.addEventListener("click", (event) => {
		const formBackground = document.querySelector(".formBackground");
		if (event.target == formBackground) formBackground.remove();
	});
	body.appendChild(formBackground);
}

addBookBtn.addEventListener("click", () => {
	createForm("newBook");
});

removeAllBtn.addEventListener("click", () => {
	library = [];
	displayBooks();
});

for (let i = 1; i < 51; i++) {
	addBook(`testauthor${i}`, `testtitle${i}`, "611", true);
}

displayBooks();