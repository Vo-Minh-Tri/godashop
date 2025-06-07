<?php
class HomeController
{
    function index()
    {
        $conds = [];
        $sorts = ['featured' => 'DESC'];
        $page = 1;
        $itemPerPage = 4;
        //lấy 4 sản phẩm nổi bật
        $productRepository = new ProductRepository();
        $featuredProducts = $productRepository->getBy($conds, $sorts, $page, $itemPerPage);

        //lấy 4 sản phẩm mới nhất
        $sorts = ['created_date' => 'DESC'];
        $latestProducts = $productRepository->getBy($conds, $sorts, $page, $itemPerPage);

        // Lấy tất cả danh mục sản phẩm
        $categoryRepository = new CategoryRepository();
        $categories = $categoryRepository->getAll();

        //đặt 1 mảng để chứa toàn bộ cấu trúc dữ liệu để hiển thị ra view
        $categoryProducts = [];

        foreach ($categories as $category) {
            $cond = [
                'category_id' => [
                    'type' => '=',
                    'val' => $category->getId()
                ]
            ];
            $products = $productRepository->getBy($conds, $sorts, $page, $itemPerPage);

            $categoryProducts[] = [
                'categoryName' => $category->getName(),
                'products' => $products
            ];
        }
        require 'view/home/index.php';
    }
}
