const BaseRepository = require ("./BaseRepository") ;

class ProductRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }
}

export default ProductRepository;