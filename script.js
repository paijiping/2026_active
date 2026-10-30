const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHYWvIU6nZoyomFBR2ZBrfGbuy3YicRrzb_gSqU4mYxzvCAF1-i9EWCoIip65VhXxx/exec";

const form = document.querySelector("#registration-form");
const statusMessage = document.querySelector("#form-status");
const submitButton = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.removeAttribute("data-state");

  if (!APPS_SCRIPT_URL) {
    statusMessage.dataset.state = "error";
    statusMessage.textContent = "報名系統尚未連線，請稍後再試。";
    return;
  }

  submitButton.disabled = true;
  statusMessage.textContent = "正在送出報名...";

  try {
    const formData = new FormData(form);
    const payload = new URLSearchParams({
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      department: formData.get("department").trim(),
      phone: formData.get("phone").trim(),
      title: formData.get("title").trim(),
    });

    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload,
    });

    statusMessage.textContent = "報名資料已送出，感謝參加！";
    form.reset();
  } catch {
    statusMessage.dataset.state = "error";
    statusMessage.textContent = "送出失敗，請確認網路連線後再試一次。";
  } finally {
    submitButton.disabled = false;
  }
});