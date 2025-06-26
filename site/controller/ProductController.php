<?php
class ProductController
{
    function index()
    {
        $conds = [];
        $sorts = [];
        $page = $_GET['page'] ?? 1;
        $item_per_page = 10;

        $category_id = $_GET['category_id'] ?? null;
        if ($category_id) {
            $conds = [
                'category_id' => [
                    'type' => '=',
                    'val' => $category_id
                ]
            ];
            // SELECT * FROM view_product WHERE catory_id = 
        }

        $priceRange = $_GET['price-range'] ?? null;
        if ($priceRange) {
            $temp = explode('-', $priceRange);
            $start_price = $temp[0];
            $end_price = $temp[1];
            $conds = [
                'sale_price' => [
                    'type' => 'BETWEEN',
                    'val' => "$start_price AND $end_price"
                ]
            ];
            // SELECT * FROM view_product WHERE sale_price BETWEEN ... AND ...

            if ($end_price == 'greater') {
                $conds = [
                    'sale_price' => [
                        'type' => '>=',
                        'val' => $start_price
                    ]
                ];
            }
        }

        // sort=price-desc
        $sort = $_GET['sort'] ?? null;
        if ($sort) {
            $map = [
                'price' => 'sale_price',
                'alpha' => 'name',
                'created' => 'created_date',
            ];
            $temp = explode('-', $sort);
            $dummyCol = $temp[0]; //price
            $col_name = $map[$dummyCol];
            $order = $temp[1]; //desc
            $sorts = [
                $col_name => $order,
            ];
        }

        $search = $_GET['search'] ?? null;
        if ($search) {
            $conds = [
                'name' => [
                    'type' => 'LIKE',
                    'val' => "'%$search%'"
                ]
            ];
            // SELECT * FROM view_product WHERE name LIKE '%search%' 
        }

        $productRepository = new ProductRepository();
        $products = $productRepository->getBy($conds, $sorts, $page, $item_per_page);

        $totalProduct = $productRepository->getBy($conds, $sorts);
        $totalPage = ceil(count($totalProduct) / $item_per_page);

        $categoryRepository = new CategoryRepository();
        $categories = $categoryRepository->getAll();
        require 'view/product/index.php';
    }
}
