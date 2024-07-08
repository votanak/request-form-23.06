import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
registerLocale('ru', ru);
import styled from 'styled-components';

const AppStyle = styled.div`
  .react-datepicker__close-icon {
    margin-right: -30px;
  }
  .react-datepicker__input-container {
    & input {
      border-radius: 5px;
      border: gray 1px solid;
      padding: 5px;
    }
    &input: focus {
      border: gray 1px solid;
    }
  }
  .react-datepicker__close-icon::after {
    padding-top: 0;
  }
`;

function App() {
  const [formData, setFormData] = useState({
    marketplace: '',
    market: '',
    performanceKey: '',
    performanceSecret: '',
    client_id: '',
    client_key: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const [showPerformance, setShowPerformance] = useState('hidden');

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
        performanceKey: formData.performanceKey,
        performanceSecret: formData.performanceSecret,
        market: formData.market,
        client_id: formData.client_id,
        client_key: formData.client_key,
        startDate: formData.startDate,
        endDate: formData.startDate,
      }),
    }).then((data) => alert(data));
    setFormData({
      marketplace: '',
      performanceKey: '',
      performanceSecret: '',
       market: '',
      client_id: '',
      client_key: '',
      startDate: new Date(),
      endDate: new Date(),
    });
  };


  const marketPlaceSelectionHandle = (e) => {
      setFormData({ ...formData, marketplace: e.target.value })
      setShowPerformance(e.target.value === 'OZON'? '': 'hidden')
      setFormData({
        performanceKey: '',
        performanceSecret: '',
        market: '',
        client_id: '',
        client_key: '',
        startDate: new Date(),
        endDate: new Date(),
      });
  }

  console.log(formData);

  return (
    <AppStyle>
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
                  required
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.marketplace}
                  onChange={marketPlaceSelectionHandle}>
                  <option value="">-- Выберите площадку --</option>
                  <option value="OZON">OZON</option>
                  <option value="WB">Wildberries</option>
                </select>
              </div>
            </div>
            
            <div className=''>
              <label
                htmlFor="marketplace"
                className="block text-sm font-medium leading-6 text-gray-900 mx-auto sm:max-w-sm">
                Магазин
              </label>
              <div className="mt-2">
                <select
                  name="market"
                  id="market"
                  required
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.market}
                  onChange={e => setFormData({...formData, market: e.target.value})}>
                  <option value="">-- Выберите магазин --</option>
                  <option value="market1">market1</option>
                  <option value="market2">market2</option>
                  <option value="market3">market3</option>
                  <option value="market4">market4</option>
                </select>
              </div>
            </div>

            <div className={`${showPerformance} mx-auto sm:max-w-sm`}>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="client-id"
                  className="block text-sm font-medium leading-6 text-gray-900 ">
                  Performance Key
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="performance-key"
                  name="performance-key"
                  type="text"
                  placeholder="Performance Key"
                  required={formData.marketplace === 'OZON'? true :false}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setFormData({ ...formData, performanceKey: e.target.value });
                  }}
                  value={formData.performanceKey}
                />
              </div>
            </div>

            <div className={`${showPerformance} mx-auto sm:max-w-sm`}>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="client-id"
                  className="block text-sm font-medium leading-6 text-gray-900 ">
                  Performance Secret
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="performance-secret"
                  name="performance-secret"
                  type="text"
                  placeholder="Performance Secret"
                  required={formData.marketplace === 'OZON'? true :false}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setFormData({ ...formData, performanceSecret: e.target.value });
                  }}
                  value={formData.performanceSecret}
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
              <div className="flex justify-center flex-col">
                <div className="text-center">Временной диапазон</div>
                <DatePicker
                  id="dates"
                  name="dates"
                  locale="ru"
                  required
                  selectsRange={true}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  isClearable={true}
                  dateFormat="dd/MM/yyyy"
                  onChange={(update) =>
                    setFormData({
                      ...formData,
                      startDate: update[0],
                      endDate: update[1],
                    })
                  }
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
    </AppStyle>
  );
}

export default App;
