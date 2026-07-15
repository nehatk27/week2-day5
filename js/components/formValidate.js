import { showToast } from "../utils.js";

export function init() {
  const formElement = document.querySelector("#registrationForm");

  if (!formElement) {
    return;
  }

  const validationRules = {
    name: [
      { type: "required", message: "Name cannot be blank" },
      {
        type: "minLength",
        value: 2,
        message: "Name requires at least 2 characters.",
      },
    ],

    email: [
      { type: "required", message: "Email cannot be blank" },
      { type: "email", message: "Email format incorrect" },
    ],

    phone: [
      {
        type: "pattern",
        value: /^[6-9]\d{9}$/,
        message: "Please enter a valid phone number",
      },
    ],

    department: [{ type: "required", message: "Please select a department" }],
    message: [
      { type: "required", message: "Message cannot be blank" },
      {
        type: "minLength",
        value: 20,
        message: "Message must be at least 20 characters.",
      },
    ],
  };

  class FormValidator {
    constructor(formElement, rules) {
      this.form = formElement;
      this.rules = rules;
      this.errors = {};

      this.init();
    }

    init() {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
      this.form.addEventListener(
        "blur",
        (e) => {
          const fieldName = e.target.name;

          if (fieldName && this.rules[fieldName]) {
            this.validateField(fieldName);
          }
        },
        true,
      );

      this.form.addEventListener("change", (e) => {
        const fieldName = e.target.name;
        if (fieldName && this.rules[fieldName]) {
          this.validateField(fieldName);
        }
      });
    }

    validateField(fieldName) {
      const formData = new FormData(this.form);
      const rawValue = formData.get(fieldName);
      const fieldRules = this.rules[fieldName] || [];
      let fieldErrorMsg = "";

      for (const rule of fieldRules) {
        const isPassed = this.validateRule(rawValue, rule, formData);

        if (!isPassed) {
          fieldErrorMsg = rule.message || "field error.";
          break;
        }
      }
      if (fieldErrorMsg) {
        this.errors[fieldName] = fieldErrorMsg;
        this.updateUI(fieldName, false, fieldErrorMsg);
      } else {
        delete this.errors[fieldName];
        this.updateUI(fieldName, true);
      }
    }

    updateUI(fieldName, isValid, message = "") {
      const inputElement = this.form.querySelector(`[name="${fieldName}"]`);
      if (!inputElement) return;

      const container = inputElement.parentElement;
      const errorSpan = container.querySelector(`span.field-error`);

      if (isValid) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        if (errorSpan) errorSpan.textContent = "";
      } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        if (errorSpan) errorSpan.textContent = message;
      }
    }

    validateRule(value, rule, formData) {
      const strValue =
        value !== null && value !== undefined ? String(value).trim() : "";

      switch (rule.type) {
        case "required":
          return strValue !== "";
        case "minLength":
          if (strValue === "") return true;
          return strValue.length >= rule.value;
        case "maxLength":
          return strValue.length <= rule.value;
        case "pattern":
          if (strValue === "") return true;
          const regex =
            rule.value instanceof RegExp ? rule.value : new RegExp(rule.value);
          return regex.test(strValue);
        case "email":
          if (strValue === "") return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strValue);
        default:
          return true;
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      this.errors = {};
      for (const fieldName of Object.keys(this.rules)) {
        this.validateField(fieldName);
      }

      if (Object.keys(this.errors).length > 0) {
        console.warn("Submission blocked due to errors:", this.errors);
        return;
      }
      this.showLoadingState();
    }

    showLoadingState() {
      const submitBtn = this.form.querySelector(".btn-submit");
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "sending ...";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        showToast("success", "Form submitted successfully!", 3000);

        this.form.reset();

        this.form.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
          el.classList.remove("is-valid", "is-invalid");
        });
      }, 1500);
    }
  }

  const targetForm = document.getElementById("registrationForm");
  const myValidator = new FormValidator(targetForm, validationRules);
}
