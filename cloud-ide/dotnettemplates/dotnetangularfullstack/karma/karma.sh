#!/bin/bash
export NVM_DIR="/usr/local/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20
export CHROME_BIN=/usr/bin/chromium

if [ ! -d "/home/coder/project/workspace/angularapp" ]
then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
    # checking for admin-add.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/admin-add" ]
    then
        cp /home/coder/project/workspace/karma/admin-add.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/admin-add/admin-add.component.spec.ts;
    else
        echo "Frontend_AdminAddComponent_should_create_component FAILED";
        echo "Frontend_AdminAddComponent_should_not_call_service_when_fields_are_invalid FAILED";
        echo "Frontend_AdminAddComponent_should_call_service_when_fields_are_valid FAILED";
    fi

    # checking for admin-form.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/admin-form" ]
    then
        cp /home/coder/project/workspace/karma/admin-form.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/admin-form/admin-form.component.spec.ts;
    else
        echo "Frontend_AdminFormComponent_should_create_component FAILED";
        echo "Frontend_AdminFormComponent_should_load_product_on_init_when_id_is_present FAILED";
        echo "Frontend_AdminFormComponent_should_show_alert_when_fields_are_invalid_on_update FAILED";
        echo "Frontend_AdminFormComponent_should_call_updateProduct_when_fields_are_valid FAILED";
    fi

    # checking for admin-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/admin-list" ]
    then
        cp /home/coder/project/workspace/karma/admin-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/admin-list/admin-list.component.spec.ts;
    else
        echo "Frontend_AdminListComponent_should_create_component FAILED";
        echo "Frontend_AdminListComponent_should_load_products_on_init FAILED";
        echo "Frontend_AdminListComponent_should_navigate_to_add_product FAILED";
    fi

    # checking for cart.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/cart" ]
    then
        cp /home/coder/project/workspace/karma/cart.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/cart/cart.component.spec.ts;
    else
        echo "Frontend_CartComponent_should_create FAILED";
        echo "Frontend_CartComponent_should_load_cart_items_on_init FAILED";
        echo "Frontend_CartComponent_should_calculate_total_correctly FAILED";
    fi

    # checking for cart.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/cart.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/cart.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/cart.service.spec.ts;
    else
        echo "Frontend_CartService_should_be_created FAILED";
        echo "Frontend_CartService_should_add_an_item_to_the_cart FAILED";
        echo "Frontend_CartService_should_clear_the_cart FAILED";
    fi

    # checking for footer.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/footer" ]
    then
        cp /home/coder/project/workspace/karma/footer.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/footer/footer.component.spec.ts;
    else
        echo "Frontend_FooterComponent_should_create FAILED";
    fi

    # checking for home.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/home" ]
    then
        cp /home/coder/project/workspace/karma/home.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/home/home.component.spec.ts;
    else
        echo "Frontend_HomeComponent_should_create FAILED";
        echo "Frontend_HomeComponent_should_load_products_on_init_and_filter_out_disabled FAILED";
        echo "Frontend_HomeComponent_should_calculate_totalPages_correctly FAILED";
        echo "Frontend_HomeComponent_should_reset_filters FAILED";
        echo "Frontend_HomeComponent_should_call_addToCart_on_CartService FAILED";
    fi

    # checking for login-state.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/login-state.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/login-state.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/login-state.service.spec.ts;
    else
        echo "Frontend_LoginStateService_should_be_created FAILED";
        echo "Frontend_LoginStateService_should_emit_login_status FAILED";
    fi

    # checking for login.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/login" ]
    then
        cp /home/coder/project/workspace/karma/login.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/login/login.component.spec.ts;
    else
        echo "Frontend_LoginComponent_should_create_LoginComponent FAILED";
        echo "Frontend_LoginComponent_should_initialize_form_with_empty_values FAILED";
        echo "Frontend_LoginComponent_should_not_submit_form_if-invalid FAILED";
    fi

    # checking for navbar.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/navbar" ]
    then
        cp /home/coder/project/workspace/karma/navbar.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/navbar/navbar.component.spec.ts;
    else
        echo "Frontend_NavbarComponent_should_create_NavbarComponent FAILED";
        echo "Frontend_NavbarComponent_should_have_initial_state_with_cartCount_0_and_not_logged_in FAILED";
        echo "Frontend_NavbarComponent_should_logout_user_and_reset_states FAILED";
    fi

    # checking for product.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/product.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/product.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/product.service.spec.ts;
    else
        echo "Frontend_ProductService_should_be_created FAILED";
        echo "Frontend_ProductService_should_fetch_all_products FAILED";
        echo "Frontend_ProductService_should_add_product FAILED";
        echo "Frontend_ProductService_should_update_product FAILED";
        echo "Frontend_ProductService_should_delete_product FAILED";
    fi

    # checking for profile.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/profile" ]
    then
        cp /home/coder/project/workspace/karma/profile.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/profile/profile.component.spec.ts;
    else
        echo "Frontend_profileComponent_should_be_created FAILED";
    fi

    # checking for signup.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/signup" ]
    then
        cp /home/coder/project/workspace/karma/signup.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/signup/signup.component.spec.ts;
    else
        echo "Frontend_SignupComponent_should_create_SignupComponent FAILED";
        echo "Frontend_SignupComponent_should_initialize_signup_form_with_empty_fields FAILED";
    fi

    # checking for user.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/user.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/user.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/user.service.spec.ts;
    else
        echo "Frontend_UserService_should_be_created FAILED";
        echo "Frontend_UserService_should_register_user FAILED";
        echo "Frontend_UserService_should_login_user FAILED";
    fi

    if [ -d "/home/coder/project/workspace/angularapp/node_modules" ]; 
    then
        cd /home/coder/project/workspace/angularapp/
        npm test;
    else
        cd /home/coder/project/workspace/angularapp/
        yes | npm install
        npm test
    fi 
else   
    echo "Frontend_AdminAddComponent_should_create_component FAILED";
    echo "Frontend_AdminAddComponent_should_not_call_service_when_fields_are_invalid FAILED";
    echo "Frontend_AdminAddComponent_should_call_service_when_fields_are_valid FAILED";
    echo "Frontend_AdminFormComponent_should_create_component FAILED";
    echo "Frontend_AdminFormComponent_should_load_product_on_init_when_id_is_present FAILED";
    echo "Frontend_AdminFormComponent_should_show_alert_when_fields_are_invalid_on_update FAILED";
    echo "Frontend_AdminFormComponent_should_call_updateProduct_when_fields_are_valid FAILED";
    echo "Frontend_AdminListComponent_should_create_component FAILED";
    echo "Frontend_AdminListComponent_should_load_products_on_init FAILED";
    echo "Frontend_AdminListComponent_should_navigate_to_add_product FAILED";
    echo "Frontend_CartComponent_should_create FAILED";
    echo "Frontend_CartComponent_should_load_cart_items_on_init FAILED";
    echo "Frontend_CartComponent_should_calculate_total_correctly FAILED";
    echo "Frontend_CartService_should_be_created FAILED";
    echo "Frontend_CartService_should_add_an_item_to_the_cart FAILED";
    echo "Frontend_CartService_should_clear_the_cart FAILED";
    echo "Frontend_FooterComponent_should_create FAILED";
    echo "Frontend_HomeComponent_should_create FAILED";
    echo "Frontend_HomeComponent_should_load_products_on_init_and_filter_out_disabled FAILED";
    echo "Frontend_HomeComponent_should_calculate_totalPages_correctly FAILED";
    echo "Frontend_HomeComponent_should_reset_filters FAILED";
    echo "Frontend_HomeComponent_should_call_addToCart_on_CartService FAILED";
    echo "Frontend_LoginStateService_should_be_created FAILED";
    echo "Frontend_LoginStateService_should_emit_login_status FAILED";
    echo "Frontend_LoginComponent_should_create_LoginComponent FAILED";
    echo "Frontend_LoginComponent_should_initialize_form_with_empty_values FAILED";
    echo "Frontend_LoginComponent_should_not_submit_form_if-invalid FAILED";
    echo "Frontend_NavbarComponent_should_create_NavbarComponent FAILED";
    echo "Frontend_NavbarComponent_should_have_initial_state_with_cartCount_0_and_not_logged_in FAILED";
    echo "Frontend_NavbarComponent_should_logout_user_and_reset_states FAILED";
    echo "Frontend_ProductService_should_be_created FAILED";
    echo "Frontend_ProductService_should_fetch_all_products FAILED";
    echo "Frontend_ProductService_should_add_product FAILED";
    echo "Frontend_ProductService_should_update_product FAILED";
    echo "Frontend_ProductService_should_delete_product FAILED";
    echo "Frontend_profileComponent_should_be_created FAILED";
    echo "Frontend_SignupComponent_should_create_SignupComponent FAILED";
    echo "Frontend_SignupComponent_should_initialize_signup_form_with_empty_fields FAILED";
    echo "Frontend_UserService_should_be_created FAILED";
    echo "Frontend_UserService_should_register_user FAILED";
    echo "Frontend_UserService_should_login_user FAILED";
fi
