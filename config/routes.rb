Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :todos, only: [:index, :create, :show, :destroy, :update] do
      resources :steps, only: [:index, :create]
    end
    resources :steps, only: [:update, :destroy]
  end
end
