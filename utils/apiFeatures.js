class APIFeatures {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  filter() {
    const copyQueryObject = { ...this.queryObject };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete copyQueryObject[el]);

    const queryString = JSON.stringify(copyQueryObject).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    const sortBy = this.queryObject.sort
      ? this.queryObject.sort.split(',').join(' ')
      : 'price';
    this.query = this.query.sort(sortBy);

    return this;
  }

  limitFields() {
    const fields = this.queryObject.fields
      ? this.queryObject.fields.split(',').join(' ')
      : '-__v';
    this.query = this.query.select(fields);

    return this;
  }

  paginate() {
    const page = this.queryObject.page * 1 || 1;
    const limit = this.queryObject.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
