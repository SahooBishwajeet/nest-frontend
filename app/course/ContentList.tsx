const ContentList = () => {
  const sections = [
      {
          title: '1. Carbohydrate',
          items: [
              { title: 'Topic 1', completed: true },
              { title: 'Topic 2', completed: false },
          ],
      },
      {
          title: '2. Milk Processing',
          items: [
              { title: 'Pasteurization and Sterilization', completed: true },
              { title: 'Cream and Butter', completed: false },
          ],
      },
  ];

  return (
      <div>
          {sections.map((section, index) => (
              <div key={index} className="mb-4">
                  <h4 className="font-semibold">{section.title}</h4>
                  <ul className="ml-4">
                      {section.items.map((item, i) => (
                          <li
                              key={i}
                              className={`text-sm ${
                                  item.completed ? 'text-green-500' : 'text-gray-800'
                              }`}
                          >
                              {item.title}
                          </li>
                      ))}
                  </ul>
              </div>
          ))}
      </div>
  );
};

export default ContentList;
