let elementsCount = 0;
const colors = ["red", "black", "blue", "green"]; // Kolory dla kategorii

document.getElementById("addElement").onclick = function () {
  const elementId = `element${elementsCount++}`;
  const elementDiv = document.createElement("div");
  elementDiv.className = "element";
  elementDiv.id = elementId;

  elementDiv.innerHTML = `
            <div class="elementsMainButtons">
              <h3 class="elementHeadline">Wykres ${elementsCount}</h3>
              <div class="elementButtonsContainer">
                <button class="removeElement elementButton">Usuń Element</button>
                <button class="createChart elementButton">Utwórz/aktualizuj wykres</button>
                <button class="updateFields elementButton">Aktualizuj pola</button>
              </div>
            </div>
            <div class="elementContent">
              <div class="dataForm"> 
                  <div class="dataEntry">
                      <label class="personName">Imię: <input type="text" class="name" placeholder="Podaj imię"></label>
                      <button class="removePerson">Usuń osobę</button>
                  </div>
                  <button class="addPerson">Dodaj kolejną osobę</button>
                  <div class="categoryForm">
                      <label>Nazwa kategorii: <input type="text" class="categoryName" placeholder="Podaj nazwę kategorii"></label>
                      <button class="createCategory">Utwórz kategorię</button>
                  </div>
                  <div class="newCategoryContainer"></div>
              </div>
              <canvas class="canvas" id="chart${elementsCount}"></canvas>
            </div>
          `;

  document.getElementById("elementsContainer").appendChild(elementDiv);

  const ctx = document.getElementById(`chart${elementsCount}`).getContext("2d");
  let chart = null;
  const data = {
    labels: [],
    datasets: [],
  };

  document.querySelector(`#${elementId} .removeElement`).onclick = function () {
    document.getElementById("elementsContainer").removeChild(elementDiv);
  };

  document.querySelector(`#${elementId} .addPerson`).onclick = function () {
    const dataEntry = document.createElement("div");
    dataEntry.className = "dataEntry";
    dataEntry.innerHTML = `
                    <label class="personName">Imię: <input type="text" class="name" placeholder="Podaj imię"></label>
                    <button class="removePerson">Usuń osobę</button>
                `;
    elementDiv
      .querySelector(".dataForm")
      .insertBefore(dataEntry, elementDiv.querySelector(".addPerson"));

    // Dodaj funkcję usuwania osoby
    dataEntry.querySelector(".removePerson").onclick = function () {
      elementDiv.querySelector(".dataForm").removeChild(dataEntry);
    };
  };

  document.querySelector(`#${elementId} .createCategory`).onclick =
    function () {
      const categoryName = elementDiv.querySelector(".categoryName").value;
      const names = Array.from(elementDiv.querySelectorAll(".dataEntry .name"))
        .map((input) => input.value)
        .filter((name) => name);

      if (categoryName && names.length > 0) {
        const newCategoryDiv = document.createElement("div");
        newCategoryDiv.className = "categoryEntry";
        newCategoryDiv.innerHTML = `
                        <strong>${categoryName}</strong>
                        <div class="categotyConfiguration">
                            <label>Wartości dla osób:</label>
                            ${names
                              .map(
                                (name) => `
                                <label>${name}: <input type="number" class="categoryValue" placeholder="Wartość"></label>
                            `
                              )
                              .join("")}
                            <button class="removeCategory">Usuń kategorię</button>
                        </div>
                    `;
        elementDiv
          .querySelector(".newCategoryContainer")
          .appendChild(newCategoryDiv);
        elementDiv.querySelector(".categoryName").value = "";

        newCategoryDiv.querySelector(".removeCategory").onclick = function () {
          elementDiv
            .querySelector(".newCategoryContainer")
            .removeChild(newCategoryDiv);
        };
      }
    };

  document.querySelector(`#${elementId} .createChart`).onclick = function () {
    const names = Array.from(elementDiv.querySelectorAll(".dataEntry .name"))
      .map((input) => input.value)
      .filter((name) => name);
    data.labels = names;

    data.datasets = [];
    const categoryEntries = elementDiv.querySelectorAll(".categoryEntry");
    categoryEntries.forEach((entry, index) => {
      const categoryName = entry.querySelector("strong").innerText;
      const values = Array.from(entry.querySelectorAll(".categoryValue")).map(
        (input) => parseInt(input.value) || 0
      );
      const dataset = {
        label: categoryName,
        data: values,
        backgroundColor: colors[index % colors.length] + "rgba(255, 0, 0, 0.5)",
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: "rgba(0, 0, 0, 0.2)",
      };
      data.datasets.push(dataset);
    });

    if (data.labels.length > 0 && data.datasets.length > 0) {
      if (!chart) {
        chart = new Chart(ctx, { type: "bar", data: data });
      } else {
        chart.data = data;
        chart.update();
      }
    }
  };

  document.querySelector(`#${elementId} .updateFields`).onclick = function () {
    const names = Array.from(elementDiv.querySelectorAll(".dataEntry .name"))
      .map((input) => input.value)
      .filter((name) => name);
    const categoryEntries = elementDiv.querySelectorAll(".categoryEntry");

    categoryEntries.forEach((entry) => {
      const categoryName = entry.querySelector("strong").innerText;
      const valueInputs = Array.from(entry.querySelectorAll(".categoryValue"));

      // Dostosowanie wartości dla osób
      valueInputs.forEach((input, index) => {
        if (index >= names.length) {
          input.parentElement.remove(); // Usuń input, jeśli nie ma osoby
        } else {
          input.value = ""; // Możesz też zaktualizować wartość
        }
      });

      // Dodawanie nowych pól dla nowych osób
      for (let i = valueInputs.length; i < names.length; i++) {
        const newInput = document.createElement("label");
        newInput.innerHTML = `${names[i]}: <input type="number" class="categoryValue" placeholder="Wartość">`;
        entry.querySelector("div").appendChild(newInput);
      }
    });
  };
};

document.getElementById("removeAll").onclick = function () {
  document.getElementById("elementsContainer").innerHTML = "";
  elementsCount = 0;
};
