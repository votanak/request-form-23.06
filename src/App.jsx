import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    links: '',
    client_id: '',
    client_key: '',
  });

  const sendForm = (e) => {
    e.preventDefault();
    alert('Отправлено');
    setFormData({
      links: '',
      client_id: '',
      client_key: '',
    });
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
                htmlFor="links"
                className="block text-sm font-medium leading-6 text-gray-900">
                Cсылки
              </label>
              <div class="mt-2">
                <input
                  id="links"
                  name="email"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setFormData({ ...formData, links: e.target.value });
                  }}
                  value={formData.links}
                />
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
              <div class="mt-2">
                <input
                  id="client-id"
                  name="client-id"
                  type="text"
                  autocomplete="current-password"
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
              <div class="mt-2">
                <input
                  id="client-key"
                  name="client-key"
                  type="text"
                  autocomplete="current-password"
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
