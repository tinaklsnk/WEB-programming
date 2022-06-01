(function (global) {

        var ns = {};

        var homeHtml = "snippets/home-snippet.html";

        var allCategoriesUrl = "data/catalog.json";
        var categoriesTitleHtml = "snippets/categories-title-snippet.html";
        var categoryHtml = "snippets/category-snippet.html";

        var catalogItemsUrl = "data/categories/";
        var catalogItemsTitleHtml = "snippets/item-title-snippet.html";
        var catalogItemHtml = "snippets/item-snipet.html";

        var insertHtml = function (selector, html) {
            var targetElem = document.querySelector(selector);
            targetElem.innerHTML = html;
        };

        document.addEventListener("DOMContentLoaded", function (event) {
            $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            }, false);
        });

        ns.loadHome = function () {
            $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
                switchHomeToActive();
                document.querySelector("#main-content").innerHTML = responseText;
            }, false);
        };

        var insertProperty = function (string, propName, propValue) {
            var propToReplace = "{{" + propName + "}}";
            string = string.replace(new RegExp(propToReplace, "g"), propValue);
            return string;
        };

        ns.loadCatalogCategories = function () {
            $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
        };



        function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {

            var finalHTML = categoriesTitleHtml;
            finalHTML += "<div class='container p-0'>";
            finalHTML += "<section class='row'>";

            for (var i = 0; i < categories.length; i++) {
                var html = categoryHtml;
                var name = "" + categories[i].name;
                var short_name = categories[i].short_name;
                html = insertProperty(html, "name", name);
                html = insertProperty(html, "short_name", short_name);
                finalHTML += html;
            }

            finalHTML += "</section>";
            finalHTML += "</div>";
            return finalHTML;
        }

        ns.loadCatalogItems = function (categoryShort) {
            $ajaxUtils.sendGetRequest(catalogItemsUrl + categoryShort + ".json", buildAndShowCatalogItemsHTML);
        };

        function buildAndShowCategoriesHTML(categories) {
            $ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
                $ajaxUtils.sendGetRequest(categoryHtml, function (categoryHTML) {

                    switchCatalogToActive();

                    var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHTML);
                    insertHtml("#main-content", categoriesViewHtml);
                }, false);
            }, false);
        }

        function buildAndShowCatalogItemsHTML(categoryCatalogItems) {
            $ajaxUtils.sendGetRequest(catalogItemsTitleHtml, function (catalogItemTitleHtml) {
                $ajaxUtils.sendGetRequest(catalogItemHtml, function (catalogItemHtml) {
                    switchCatalogToActive();

                    var catalogItemsViewHtml = buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemTitleHtml, catalogItemHtml);
                    insertHtml("#main-content", catalogItemsViewHtml);
                }, false);
            }, false);
        }

        function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {

            var finalHTML = categoriesTitleHtml;
            finalHTML += "<div class='container p-0'>";
            finalHTML += "<section class='row'>";

            for (var i = 0; i < categories.length; i++) {
                var html = categoryHtml;
                var name = "" + categories[i].name;
                var short_name = categories[i].short_name;
                html = insertProperty(html, "name", name);
                html = insertProperty(html, "short_name", short_name);
                finalHTML += html;
            }

            finalHTML += "</section>";
            finalHTML += "</div>";
            return finalHTML;
        }

        ns.loadCatalogItems = function (categoryShort) {
            $ajaxUtils.sendGetRequest(catalogItemsUrl + categoryShort + ".json", buildAndShowCatalogItemsHTML);
        };

        function buildAndShowCatalogItemsHTML(categoryCatalogItems) {
            $ajaxUtils.sendGetRequest(catalogItemsTitleHtml, function (catalogItemTitleHtml) {
                $ajaxUtils.sendGetRequest(catalogItemHtml, function (catalogItemHtml) {

                    switchCatalogToActive();

                    var catalogItemsViewHtml = buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemTitleHtml, catalogItemHtml);
                    insertHtml("#main-content", catalogItemsViewHtml);
                }, false);
            }, false);
        }

        function buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemsTitleHtml, catalogItemHtml) {

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "name", categoryCatalogItems.category.name);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "special_instructions", categoryCatalogItems.category.special_instructions);

            var finalHtml = catalogItemsTitleHtml;

            finalHtml += "<div class='container p-0'>";
            finalHtml += "<section class='row'>";

            var catalogItems = categoryCatalogItems.catalog_items;
            var catShort_name = categoryCatalogItems.category.short_name;
            for (var i = 0; i < catalogItems.length; i++) {
                var html = catalogItemHtml;

                html = insertProperty(html, "short_name", catalogItems[i].short_name);

                html = insertProperty(html, "catShort_name", catShort_name);

                html = insertItemPrice(html, "price", catalogItems[i].price);

                html = insertProperty(html, "name", catalogItems[i].name);

                html = insertProperty(html, "description", catalogItems[i].description);

                finalHtml += html;
            }

            finalHtml += "</section>";
            finalHtml += "</div>";
            return finalHtml;
        }

        function insertItemPrice(html, pricePropName, priceValue) {
            if (!priceValue) {
                return insertProperty(html, pricePropName, "");
            }
            priceValue = "$" + priceValue.toFixed(2);
            html = insertProperty(html, pricePropName, priceValue);
            return html;
        }

        var switchCatalogToActive = function () {
            var classes = document.querySelector("#home_link").className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector("#home_link").className = classes;

            classes = document.querySelector("#category_link").className;
            if (classes.indexOf("active") === -1) {
                classes += " active";
                document.querySelector("#category_link").className = classes;
            }
        };

        var switchHomeToActive = function () {
            var classes = document.querySelector("#category_link").className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector("#category_link").className = classes;

            classes = document.querySelector("#home_link").className;
            if (classes.indexOf("active") === -1) {
                classes += " active";
                document.querySelector("#home_link").className = classes;
            }
        };

        ns.loadSpecials = function (categoryShort) {
            var randomCategoriesJSON = ["A", "B", "C", "D"].find((_, i, ar) => Math.random() < 1 / (ar.length - i));
            $ajaxUtils.sendGetRequest(catalogItemsUrl + randomCategoriesJSON + ".json", buildAndShowCatalogItemsHTML);
        };

        global.$ns = ns;

    }
)(window);