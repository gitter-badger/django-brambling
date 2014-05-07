from django.conf.urls import patterns, url, include

from brambling.forms import FloppyAuthenticationForm
from brambling.views import (ReservationView, EventCreateView,
                             EventUpdateView, PersonView, HomeView,
                             ItemListView, item_form, DiscountListView,
                             discount_form, SignUpView, EmailConfirmView,
                             EventDetailView, send_confirmation_email_view,
                             CartView, CheckoutView)


urlpatterns = patterns('',
    url(r'^$',
        "brambling.views.home",
        name="brambling_dashboard"),
    url(r'^create/$',
        EventCreateView.as_view(),
        name="brambling_event_create"),

    url(r'^login/$',
        'django.contrib.auth.views.login',
        {'authentication_form': FloppyAuthenticationForm},
        name='login'),
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^signup/$',
        SignUpView.as_view(),
        name="brambling_signup"),
    url(r'^email_confirm/send/$',
        send_confirmation_email_view,
        name="brambling_email_confirm_send"),
    url(r'^email_confirm/(?P<pkb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})$',
        EmailConfirmView.as_view(),
        name="brambling_email_confirm"),

    url(r'^profile/$',
        PersonView.as_view(),
        name="brambling_user_profile"),
    url(r'^home/$',
        HomeView.as_view(),
        name="brambling_home"),

    url(r'^(?P<slug>[\w-]+)/$',
        EventDetailView.as_view(),
        name="brambling_event_detail"),
    url(r'^(?P<slug>[\w-]+)/reserve/$',
        ReservationView.as_view(),
        name="brambling_event_reserve"),
    url(r'^(?P<slug>[\w-]+)/cart/$',
        CartView.as_view(),
        name="brambling_event_cart"),
    url(r'^(?P<slug>[\w-]+)/checkout/$',
        CheckoutView.as_view(),
        name="brambling_event_checkout"),
    url(r'^(?P<slug>[\w-]+)/edit/$',
        EventUpdateView.as_view(),
        name="brambling_event_update"),

    url(r'^(?P<event_slug>[\w-]+)/items/$',
        ItemListView.as_view(),
        name="brambling_item_list"),
    url(r'^(?P<event_slug>[\w-]+)/items/create/$',
        item_form,
        name="brambling_item_create"),
    url(r'^(?P<event_slug>[\w-]+)/items/(?P<pk>\d+)/$',
        item_form,
        name="brambling_item_update"),

    url(r'^(?P<event_slug>[\w-]+)/discount/$',
        DiscountListView.as_view(),
        name="brambling_discount_list"),
    url(r'^(?P<event_slug>[\w-]+)/discount/create/$',
        discount_form,
        name="brambling_discount_create"),
    url(r'^(?P<event_slug>[\w-]+)/discount/(?P<pk>\d+)/$',
        discount_form,
        name="brambling_discount_update"),
)
