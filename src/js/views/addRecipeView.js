import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  isWindowClosed() {
    if (
      this._overlay.classList.contains('hidden') &&
      this._window.classList.contains('hidden')
    )
      return true;
  }

  _generateMarkupForm() {
    const markup = `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="" required name="title" type="text" placeholder="At least 3 characters long" />
        <label>URL</label>
        <input value="" required name="sourceUrl" type="text" placeholder="At least 5 characters long" />
        <label>Image URL</label>
        <input value="" required name="image" type="text" placeholder="At least 4 characters long" />
        <label>Publisher</label>
        <input value="" required name="publisher" type="text" placeholder="At least 4 characters long" />
        <label>Prep time</label>
        <input value="" required name="cookingTime" type="number" placeholder="Integer (equal or grater than 1)" />
        <label>Servings</label>
        <input value="" required name="servings" type="number" placeholder="Integer (equal or grater than 1)" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value=""
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: Quantity,Unit,Description"
        />
        <label>Ingredient 2</label>
        <input
          value=""
          type="text"
          name="ingredient-2"
          placeholder="Format: Quantity,Unit,Description"
        />
        <label>Ingredient 3</label>
        <input
          value=""
          type="text"
          name="ingredient-3"
          placeholder="Format: Quantity,Unit,Description"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Example: 0.5,kg,Rice"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Example: 1,,Avocado"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Example: ,,Salt"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderForm() {
    this._clear();
    this._generateMarkupForm();
    this.toggleWindow();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.renderForm.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
