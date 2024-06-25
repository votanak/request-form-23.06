import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
registerLocale('ru', ru);

function App() {
  const [formData, setFormData] = useState({
    marketplace: '',
    client_id: '',
    client_key: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const sendForm = (e) => {
    e.preventDefault();
    console.log(formData);
    const request = async (url, method, params) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}${url}`,
          {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            ...(method === 'POST' ? params : {}),
          },
        );
        return response.json();
      } catch (e) {
        console.log(e);
        return e;
      }
    };
    request('/req', 'POST', {
      body: JSON.stringify({
        marketplace: formData.marketplace,
        client_id: formData.client_id,
        client_key: formData.client_key,
        startDate: '',
        endDate: '',
      }),
    }).then((data) => alert(data));
    setFormData({
      marketplace: '',
      client_id: '',
      client_key: '',
      startDate: '',
      endDate: '',
    });
  };

  const dateChange = (date, e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: date });
  };

  return (
    <div className="">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Форма отправки запроса
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full ">
          <form className="space-y-6" onSubmit={sendForm}>
            <div>
              <label
                htmlFor="marketplace"
                className="block text-sm font-medium leading-6 text-gray-900 mx-auto sm:max-w-sm">
                Площадка
              </label>
              <div className="mt-2 ">
                <select
                  name="marketplace"
                  id="marketplace"
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-- Выберите площадку --</option>
                  <option value="petersburg">OZON</option>
                  <option value="samara">Wildberries</option>
                </select>
              </div>
            </div>

            <div className="mx-auto sm:max-w-sm">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="client-id"
                  className="block text-sm font-medium leading-6 text-gray-900 ">
                  CLIENT_ID
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="client-id"
                  name="client-id"
                  type="text"
                  placeholder="client-id"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setFormData({ ...formData, client_id: e.target.value });
                  }}
                  value={formData.client_id}
                />
              </div>
            </div>

            <div className="mx-auto sm:max-w-sm">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="client-key"
                  className="block text-sm font-medium leading-6 text-gray-900 ">
                  CLIENT_KEY
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="client-key"
                  name="client-key"
                  type="text"
                  placeholder="client-key"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setFormData({ ...formData, client_key: e.target.value });
                  }}
                  value={formData.client_key}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col">
                <label htmlFor="start-date">Начальная дата</label>
                <DatePicker
                  id="start-date"
                  name="startDate"
                  locale="ru"
                  selected={formData.startDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date, e) => dateChange(date, e)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="start-date">Конечная дата</label>
                <DatePicker
                  id="end-date"
                  name="endDate"
                  locale="ru"
                  dateFormat="dd/MM/yyyy"
                  selected={formData.endDate}
                  onChange={(date) => {
                    setFormData({ ...formData, endDate: date });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm">
                Отправить запрос
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
