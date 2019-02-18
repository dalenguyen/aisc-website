


// // subject filter implementation
// $.fn.dataTable.ext.search.push((_, data) => {
//   const val = $('#subject-filter').val();
//   if (!val || val.length === 0) {
//     return true;
//   } else {
//     const subjects = data[1].split(',').map(s => spacedToDashed(s.trim()));
//     return matchAll(val, subjects);
//   }
// });

// // stream filter implementation
// $.fn.dataTable.ext.search.push((_, data) => {
//   const val = $('#stream-filter').val();
//   if (!val || val.toLowerCase() === 'all') {
//     return true;
//   } else {
//     const stream = data[2].trim();
//     return val === stream;
//   }
// });

function matchAll(queries, candidates) {
  return queries.every(q => !!candidates.find(c => c === q));
}


const SMA = [
  ['General Areas of Machine Learning', [
    ['Deep Learning', 'various architectures, explainability, relation to geometry, etc'],
    ['Reinforcement Learning'],
    ['Generative Adversarial Networks'],
    ['Quantum Machine Learning'],
    ['Representation Learning', 'auto-encoders, transfer learning, etc'],
    ['General Machine Learning Theory'],
  ]],
  ['Applications of Machine Learning', [
    ['Natural Language Processing'],
    ['Natural Language Generation'],
    ['NN on Graph'],
    ['ML in health care'],
    ['NN on Source Code'],
    ['Recommender Engines'],
    ['Computer Vision'],
    ['Speech Recognition']
  ]],
  ['Other Statistical Methods', [
    ['Bayesian Statistics'],
    ['Experimental Design'],
    ['Graphical Models'],
    ['Bayesian Networks'],
    ['Information Geometry']
  ]]
];

function spacedToDashed(s) {
  return s.toLowerCase().replace(/ /g, '-');
}

async function assembleEvents(usefulLinksElem, smaLinksElem) {

  // load up DataTable for cool gadgets such as pagination, sorting and search
  // const dataTableElem = pastElem.querySelector('#past-event-list');
  // const table = $(dataTableElem).DataTable({
  //   order: [[0, "desc"]],
  //   // https://datatables.net/reference/option/dom
  //   dom: `
  //     <'row'<'col-sm-12 col-md-12 filter-tools' <"#stream-filter-area"> <"#subject-filter-area"> f l>>
  //     <'row'<'col-sm-12'tr>>
  //     <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>`,
  //   columnDefs: [
  //     { orderSequence: ["desc"], targets: [0] },
  //     // subjects
  //     { visible: false, targets: [0, 1, 2] },
  //   ],
  //   pageLength: 5
  // });

  // const { subjects, streams } = await getEventsAndGroupings();
  // const subjectFilterElem = document.querySelector('#subject-filter-area');
  // subjectFilterElem.innerHTML = `
  //   <div className="horizontal-elem">
  //   By subject: 
  //   </div>
  //   <div className="horizontal-elem">
  //     <select id="subject-filter" className="selectpicker" multiple data-max-options="3">
  //       ${ subjects.map(s => `
  //         <option value="${spacedToDashed(s)}">${s}</option>
  //       `).join('')}
  //     </select>
  //   </div>
  // `;
  // const subjectFilterSelect = subjectFilterElem.querySelector('#subject-filter');
  // $(subjectFilterSelect).on('changed.bs.select', () => {
  //   if ($(subjectFilterSelect).val() && $(subjectFilterSelect).val().length > 0) {
  //     $(subjectFilterSelect).parent().addClass('active');
  //   } else {
  //     $(subjectFilterSelect).parent().removeClass('active');
  //   }
  //   table.draw();
  // });

  // const streamFilterElem = document.querySelector('#stream-filter-area');
  // streamFilterElem.innerHTML = `
  //   <div className="horizontal-elem">
  //   By stream: 
  //   </div>
  //   <div className="horizontal-elem">
  //     <select id="stream-filter" className="selectpicker">
  //         <option value="all">[All]</option>
  //       ${ streams.map(s => `
  //         <option>${s}</option>
  //       `).join('')}
  //     </select>
  //   </div>
  // `;

  // const streamFilterSelect = streamFilterElem.querySelector('#stream-filter');
  // $(streamFilterSelect).on('changed.bs.select', () => {
  //   if ($(streamFilterSelect).val() !== 'all') {
  //     $(streamFilterSelect).parent().addClass('active');
  //   } else {
  //     $(streamFilterSelect).parent().removeClass('active');
  //   }
  //   table.draw();
  // });

  // smaLinksElem.innerHTML = `
  //   <dl>
  //   ${SMA.map(([g, areas]) => `
  //   <dt>${g}</dt>
  //   <dd>
  //     <ul className="list-unstyled">
  //     ${areas.map(([title, desc]) => `
  //     <li>
  //       ${subjects.indexOf(title) < 0 ? title : `<a href="/#/subjects/${spacedToDashed(title)}">${title}</a>`}
  //        ${desc ? `(${desc})` : ''}
  //     </li>
  //     `).join('')}
  //     </ul>
  //   </dd>
  //   `).join('')}
  // </dl>
  // `;

}


// https://spreadsheets.google.com/feeds/list/1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE/1/public/values?alt=json
// TODO: implement scrolling

// https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section/32396543
